<?php
// Copy to the server as  contact-config.php  ONE LEVEL ABOVE public_html
// (e.g. /home/uXXXX/domains/taiftechnologies.cloud/contact-config.php).
// Never commit the real file to Git and never send the password in WhatsApp groups.
return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,                              // SSL. (587 = STARTTLS also works)
    'smtp_user' => 'info@taiftechnologies.cloud',    // the Hostinger mailbox that sends
    'smtp_pass' => 'PUT_MAILBOX_PASSWORD_HERE',
    'from_name' => 'Taif Technologies Website',
    'to_email'  => 'info@taiftechnologies.cloud',    // where messages arrive
    'allowed_origins' => [
        'https://taiftechnologies.cloud',
        'https://www.taiftechnologies.cloud',
    ],
];
