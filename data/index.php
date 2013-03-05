<?php

if(basename($_SERVER['REQUEST_URI']) == 'template-list.json') {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        array(
            array(
                'title'    => 'A Template',
                'modified' => 'Today',
                'content'  => 'This is <strong>A Template</strong> and your name is {FIRST_NAME}.'
            ),
            array(
                'title'    => 'Another Template',
                'modified' => 'Yesterday',
                'content'  => 'This is another template which will be sent to <strong>{FIRST_NAME} {LAST_NAME} &lt;{EMAIL}&gt;</strong>',
            ),
        )
    );
} else {
    header('HTTP/1.1 404 Not Found');
    echo "Not Found";
}

?>
