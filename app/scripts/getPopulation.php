<?php
// AngularJS sends POST data in a weird way that doesn't populate $_POST or $_REQUEST
// so you have to get it from php://input
$input = file_get_contents("php://input");

// Split input on . , ; : white space
$data = preg_split("/[\s.,;:]+/", $input, NULL, PREG_SPLIT_NO_EMPTY);
$array = implode(",", $data);

$db = mysqli_connect("localhost", "chris", "chris", "chris2");
if ($db->connect_error) {
    die('Connect Error (' . $db->connect_errno . ') ' . $db->connect_error);
}

$query = "SELECT id, lname, fname FROM slc_student_data WHERE id in (" . $array . ");";
$result = mysqli_query($db, $query);

$returnable = array();
while ($row = mysqli_fetch_array($result)) {
    $returnable[] = $row;
}

$db->close();

echo json_encode($returnable);
?>
