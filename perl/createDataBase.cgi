#!C:\xampp\perl\bin\perl.exe
print "Content-type: text/html\n\n";

use DBI;
use strict;

my $driver   = "SQLite";
my $db = "appointments.db";
my $dsn      = "DBI:$driver:dbname=$db";
my $user = "";
my $psswd = "";
my $dbh      = DBI->connect( $dsn, $user, $psswd, { RaiseError => 1 } )
  or die $DBI::errstr;
print "Database successfully opened! \n";

my $stmt = qq(CREATE TABLE TBL_APPOINTMENTS
   (
      DESCRIPTION           TEXT    NOT NULL,
	  DATE           DATETIME    NOT NULL	  
      ););

my $rv = $dbh->do($stmt);
if ( $rv < 0 ) {
    print $DBI::errstr;
}
else {
    print "Table successfully created! \n";
}
$dbh->disconnect();
