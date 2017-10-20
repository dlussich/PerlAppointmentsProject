#!C:\xampp\perl\bin\perl.exe
print "Content-type: text/html\n\n";

use DBI;
use strict;
use CGI::Carp;    
use CGI;

my $driver   = "SQLite";
my $db = "appointments.db";
my $dsn      = "DBI:$driver:dbname=$db";
my $user = "";
my $psswd = "";
my $dbh      = DBI->connect( $dsn, $user, $psswd, { RaiseError => 1 } )
  or die $DBI::errstr;

my $cgi = CGI->new();   

my $date = $cgi->param('date');
my $time = $cgi->param('time');
my $description = $cgi->param('description');

my @time = split( ':', $time );

my @date = split( '/', $date );

my $newDate =
    $date[2] . "-"
  . $date[0] . "-"
  . $date[1] . " "
  . $time[0] . ":"
  . $time[1] . ":00";


$description = "" . $description;

my $stmt = "INSERT INTO TBL_APPOINTMENTS(DESCRIPTION,DATE)
           VALUES ('" . $description . "','" . $newDate . "' );";


my $sth = $dbh->prepare($stmt);

my $rv = $dbh->do($stmt) or die $DBI::errstr;

$dbh->disconnect();
print"<META HTTP-EQUIV=refresh CONTENT=\"1;URL=http://localhost/pProject/formPage.html\">\n";
