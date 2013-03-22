<?php

// Mangle the URI into something useful
$uri = preg_replace('|^'.$_SERVER['SCRIPT_NAME'].'|', '', $_SERVER['REQUEST_URI']);
$uri = preg_replace('|^/|', '', $uri);
$uri = urldecode($uri);

// Split into parts on the directory separator token
$parts = explode('/', $uri);

session_start();

$data = array();
if(isset($_SESSION['spaminator-data']))
    $data = unserialize($_SESSION['spaminator-data']);

if(!isset($data['template']))
    $data['template'] = array(
        'maxid' => 0,
        'data' => array()
    );

if(!isset($data['population']))
    $data['population'] = array(
        'maxid' => 0,
        'maxmemberid' => 0,
        'data' => array()
    );

$method = $_SERVER['REQUEST_METHOD'];

switch($parts[0]) {
case 'clear':
    session_destroy();
    header('HTTP/1.1 303 See Other');
    header('Location: debug');
    quit();
case 'debug':
    echo "<!DOCTYPE html>\n<html><head><title>Debugging</title><meta http-equiv=\"refresh\" content=\"2\"></head><body>";
    echo '<a href="clear">Clear All Data</a>';
    var_dump(getPersona());
    var_dump($data);
    echo "</body></html>";
    quit();
case 'persona':
    doJson(getPersona());
case 'population':
    if(isset($parts[1])) {
        $popId = $parts[1];
        if(!hasPopulation($popId)) doNotFound($uri);

        if(isset($parts[2])) {
            $memberId = $parts[2];
            if(!hasPopulationMember($popId, $memberId)) doNotFound($uri);
            switch($method) {
            case 'GET':
                doJson(getPopulationMember($popId, $memberId));
            case 'DELETE':
                deletePopulationMember($popId, $memberId);
                doNoContent();
            default:
                doMethodNotAllowed($method);
            }
        } else {
            switch($method) {
            case 'GET':
                doJson(getPopulation($popId));
            case 'PUT':
                $newpop = array();
                $sourceData = getFromClient();
                convertIntoPopulation($sourceData, $newpop);

                foreach($newpop as $member) {
                    setPopulationMember($popId, $member['id'], $member);
                }

                header('HTTP/1.1 200 OK');
                doJson(getPopulation($popId));
            case 'DELETE':
                deletePopulation($popId);
                doNoContent();
            default:
                doMethodNotAllowed($method);
            }
        }
    } else {
        switch($method) {
        case 'GET':
            doJson(getAllPopulations());
        case 'POST':
            $population = array('members' => array());
            $sourceData = getFromClient();
            convertIntoPopulation($sourceData, $population['members']);
            newPopulation($population);

            header('HTTP/1.1 201 Created');
            doJson($population);
        default:
            doMethodNotAllowed($method);
        }
    }
    quit();
case 'template-list':
    if(isset($parts[1])) {
        $id = $parts[1];
        if(!hasTemplate($id)) doNotFound($uri);

        switch($method) {
        case 'GET':
            doJson(getTemplate($id));
        case 'PUT':
            $template = getFromClient();
            setTemplate($id, $template);

            doNoContent();
        case 'DELETE':
            deleteTemplate($id);
            doNoContent();
        default:
            doMethodNotAllowed($method);
        }
    } else {
        switch($method) {
        case 'GET':
            doJson(getAllTemplates());
        case 'POST':
            $template = getFromClient();
            newTemplate($template);

            header('HTTP/1.1 201 Created');
            doJson($template);
        default:
            doMethodNotAllowed($method);
        }
    }
    quit();
default:
    doNotFound($uri);
}

function getPersona()
{
    return array(
        'authenticated' => true,
        'senderName'          => 'Jeff Tickle',
        'senderEmail'         => 'ticklejw@appstate.edu',
        'permission'    => array(
            'spaminate'     => true,
            'changePersona' => true,
            'changeName'    => true,
        )
    );
}

function convertIntoPopulation($sourceData, &$population)
{
    $input = preg_split('/[\n,]/', $sourceData['members']);

    foreach($input as $val) {
        $val = trim($val);

        if(empty($val)) continue;

        // Try Banner ID
        if(preg_match('/[0-9]{9}/', $val)) {
            $member = makeUpValues($val);
            $population[$member['email']] = $member;
            continue;
        }

        // Try Email
        if(preg_match('/<?\S+@\S+>?/', $val)) {
            $member = makeUpByEmail($val);
            newPopulationMember($member);
            $member['bannerid'] = '';
            $population[$member['id']] = $member;
            continue;
        }

        $error = makeMemberError($val, 'Unparseable');
        $population[$error['id']] = $error;
    }
}

function makeUpValues($bannerid)
{
    $email = "$bannerid@tux.appstate.edu";

    return makeMember(
        $bannerid,
        'testFirst',
        'testMiddle',
        'testLast',
        'testPrefix',
        'testSuffix',
        'testUsername',
        $email,
        false
    );
}

function makeMember($bannerid, $firstname, $middlename, $lastname, $prefix, $suffix, $username, $email)
{
    return array(
        'id'         => $email,
        'bannerid'   => $bannerid,
        'firstname'  => $firstname,
        'middlename' => $middlename,
        'lastname'   => $lastname,
        'prefix'     => $prefix,
        'suffix'     => $suffix,
        'username'   => $username,
        'email'      => $email,
        'error'      => ''
    );
}

function makeMemberError($id, $message)
{
    return array(
        'id'         => $id,
        'bannerid'   => '',
        'firstname'  => '',
        'middlename' => '',
        'lastname'   => '',
        'prefix'     => '',
        'suffix'     => '',
        'username'   => '',
        'email'      => '',
        'error'      => $message
    );
}

function makeUpByEmail($email)
{
    $first = '';
    $last  = '';
    $user  = '';
    $addr  = '';

    $matches = array();

    $sm = '(\S+)';
    $em  = '((\S+)@\S+)';

    // First Last <user@domain.com>
    if(preg_match('/'.$sm.'\s'.$sm.'\s<'.$em.'>/', $email, $matches)) {
        $first = $matches[1];
        $last  = $matches[2];
        $addr  = $matches[3];
        $user  = $matches[4];
    } else

    // Last <user@domain.com>
    if(preg_match('/'.$sm.'\s<'.$em.'>/', $email, $matches)) {
        $last = $matches[1];
        $addr = $matches[2];
        $user = $matches[3];
    } else

    // <user@domain.com>
    if(preg_match('/<'.$em.'>/', $email, $matches)) {
        $addr = $matches[1];
        $user = $matches[2];
    } else

    // user@domain.com
    if(preg_match('/'.$em.'/', $email, $matches)) {
        $addr = $matches[1];
        $user = $matches[2];
    }

    return makeMember(
        '',
        $first,
        '',
        $last,
        '',
        '',
        $user,
        $email,
        false
    );

    return $member;
}

function newPopulationMember(&$member)
{
    global $data;

    $member['id'] = $member['email'];
}

function hasPopulationMember($popId, $memberId)
{
    global $data;
    return isset($data['population']['data'][$popId]['members'][$memberId]);
}

function getPopulationMember($popId, $memberId)
{
    global $data;
    return $data['population']['data'][$popId]['members'][$memberId];
}

function setPopulationMember($popId, $memberId, $member)
{
    global $data;
    $data['population']['data'][$popId]['members'][$memberId] = $member;
}

function deletePopulationMember($popId, $memberId)
{
    global $data;
    unset($data['population']['data'][$popId]['members'][$memberId]);
}

function getAllPopulationMembers($popId)
{
    global $data;
    return $data['population']['data'][$popId]['members'];
}

function newPopulation(&$population)
{
    global $data;
    $id = ++$data['population']['maxid'];
    $population['id'] = $id;
    $data['population']['data'][$id] = $population;
}

function hasPopulation($id)
{
    global $data;
    return isset($data['population']['data'][$id]);
}

function getPopulation($id)
{
    global $data;
    return $data['population']['data'][$id];
}

function setPopulation($id, $population)
{
    global $data;
    $data['population']['data'][$id] = $population;
}

function deletePopulation($id)
{
    global $data;
    unset($data['population']['data'][$id]);
}

function getAllPopulations()
{
    global $data;
    return $data['population']['data'];
}

function newTemplate(&$template)
{
    global $data;
    $id = ++$data['template']['maxid'];
    $template['id'] = $id;
    $data['template']['data'][$id] = $template;
}

function hasTemplate($id)
{
    global $data;
    return isset($data['template']['data'][$id]);
}

function getTemplate($id)
{
    global $data;
    return $data['template']['data'][$id];
}

function setTemplate($id, $template)
{
    global $data;
    $data['template']['data'][$id] = $template;
}

function deleteTemplate($id)
{
    global $data;
    unset($data['template']['data'][$id]);
}

function getAllTemplates()
{
    global $data;
    return array_values($data['template']['data']);
}

function getFromClient()
{
    static $postdata;
    if(!empty($postdata)) return $postdata;

    return $postdata = json_decode(file_get_contents("php://input"), true);
}

function doJson($object)
{
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($object);
    quit();
}

function doNoContent()
{
    header('HTTP/1.1 204 No Content');
    quit();
}

function doMethodNotAllowed($method = null)
{
    header('HTTP/1.1 405 Method Not Allowed');
    echo "Method Not Allowed";
    if($method) {
        echo ": $method";
    }
    echo "\n";
    quit();
}

function doNotFound($path = null)
{
    header('HTTP/1.1 404 Not Found');
    echo "Not Found";
    if($path) {
        echo ": $path";
    }
    echo "\n";
    quit();
}

function quit()
{
    global $data;
    $_SESSION['spaminator-data'] = serialize($data);
    session_write_close();
    exit();
}

?>
