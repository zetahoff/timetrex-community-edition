#!/bin/bash
crontab_binary=`which crontab`
web_server_user=$1
running_as="$(whoami)"
script_dir="$( cd "$(dirname "$0")" ; pwd -P )"
cron_file=${script_dir}/maint/cron.php

if [ -z "$web_server_user" ] ; then
        echo "ERROR: Web server not specified as first argrument"
        exit 1;
fi

#Check if web user matches the running as user, Centos cannot use the -u flag without further configuration
if [ $web_server_user == $running_as ] ; then
    crontab_user_arg = ""
else
    crontab_user_arg="-u $web_server_user"
fi;

#Find out if we're already in cron.
$crontab_binary $crontab_user_arg -l | grep -i $cron_file > /dev/null
if [ $? == 1 ] ; then
    if [ -e $cron_file ] ; then
        echo "TimeTrex Maintenance Jobs NOT in cron, adding..."
        echo "* * * * * php ${cron_file} > /dev/null 2>&1" | $crontab_binary $crontab_user_arg -
    else
        echo "ERROR: TimeTrex maintenance job file does not exist: ${cron_file}";
        exit 1;
    fi
else
    echo "TimeTrex Maintenance Jobs already in cron, not adding again..."
fi;

exit 0;

