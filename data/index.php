<?php

$uri = preg_replace('|^'.$_SERVER['SCRIPT_NAME'].'|', '', $_SERVER['REQUEST_URI']);
$uri = preg_replace('|^/|', '', $uri);
$parts = explode('/', $uri);

session_start();
$data = array();
if(isset($_SESSION['spaminator-data']))
    $data = unserialize($_SESSION['spaminator-data']);

$maxid = 0;
if(isset($_SESSION['spaminator-max-id']))
    $maxid = $_SESSION['spaminator-max-id'];

/*
$data = array(
            1 => array(
                'id'       => 1,
                'title'    => 'A Template',
                'modified' => 'Today',
                'content'  => 'This is <strong>A Template</strong> and your name is {FIRST_NAME}.'
            ),
            2 => array(
                'id'       => 2,
                'title'    => 'Another Template',
                'modified' => 'Yesterday',
                'content'  => 'This is another template which will be sent to <strong>{FIRST_NAME} {LAST_NAME} &lt;{EMAIL}&gt;</strong>',
            ),
        );
 */

$method = $_SERVER['REQUEST_METHOD'];

if($parts[0] == 'debug') {
    var_dump($maxid);
    var_dump($data);
    quit();
}

if($parts[0] == 'template-list') {
    if(isset($parts[1])) {
        $id = $parts[1];
        if(!isset($data[$id])) do404($uri);

        switch($method) {
        case 'GET':
            doJson($data[$id]);
        case 'PUT':
            $client = getFromClient();
            $data[$id] = $client;

            doNoContent();
        case 'DELETE':
            unset($data[$id]);
            doNoContent();
        default:
            do405($method);
        }
    } else {
        switch($method) {
        case 'GET':
            doJson(array_values($data));
        case 'POST':
            $client = getFromClient();
            $id = ++$maxid;
            $client['id'] = $id;
            $data[$id] = $client;

            header('HTTP/1.1 201 Created');
            doJson($postdata);
        default:
            do405($method);
        }
    }
} else {
    do404($uri);
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

function do405($method = null)
{
    header('HTTP/1.1 405 Method Not Allowed');
    echo "Method Not Allowed";
    if($method) {
        echo ": $method";
    }
    echo "\n";
    quit();
}

function do404($path = null)
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
    global $maxid;
    $_SESSION['spaminator-data'] = serialize($data);
    $_SESSION['spaminator-max-id'] = $maxid;
    session_write_close();
    exit();
}

?>
