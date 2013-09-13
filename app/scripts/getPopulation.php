<?php
// AngularJS sends POST data in a weird way that doesn't populate $_POST or $_REQUEST
// so you have to get it from php://input
$input = file_get_contents("php://input");

// Split input on . , ; : white space
$data = preg_split("/[\s.,;:]+/", $input, NULL, PREG_SPLIT_NO_EMPTY);
$bannerIds = array();
$usernames = array();
$emails = array();

// Go through the input array and split the input into categories
foreach ($data as $datum) {
    if (preg_match("/\d{9}/", $datum)) {
        $bannerIds[] = $datum;
    } elseif (preg_match("/<?\S+@\S+\.\S+>?/", $datum)) {   // This regex sucks, but it's the best we got
        $emails[] = $datum;
    } elseif (preg_match("/\w+/", $datum)) {
        $usernames[] = "'" . $datum . "'";
    } else {
        //TODO: What are you feeding me?
    }
}

$db = mysqli_connect("localhost", "chris", "chris", "chris2");
if ($db->connect_error) {
    die('Connect Error (' . $db->connect_errno . ') ' . $db->connect_error);
}

$query = "SELECT id, lname, fname FROM slc_student_data WHERE id IN (" . implode(',',$bannerIds) . ");";
$result = mysqli_query($db, $query);

$returnable = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        $returnable[] = $row;
    }
}

$db->close();

echo json_encode($returnable);
?>
