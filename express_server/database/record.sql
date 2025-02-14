CREATE TABLE seizureRecord (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    TimeOfSz DATETIME,
    TypeOfSz TEXT,
    LengthOfSz INTEGER, 
    FeaturesOfSz TEXT,
    uid Integer,
    panic boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings(
Id INTEGER PRIMARY KEY AUTOINCREMENT,
uid INTEGER,
defaultStartDate TEXT,
defaultEndDate TEXT,
showPanicButton TEXT,
chartType TEXT,
theme TEXT,
pinNumber TEXT,
lengthDisplay TEXT, 
language Text,
timeMode TEXT
);

CREATE TABLE Users(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT not null,
  password TEXT not null,
  Email TEXT not null,
  profilePic TEXT
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE panicButtonConfig(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid INTEGER,
  predictedType TEXT,
  predictedLength INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Mixture(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid Integer,
  Start_date DATETIME,
  End_date DATETIME,
);

CREATE TABLE MedicationsInMixture()

CREATE TABLE Medication(
MedId: 138
MedicationName: name
  
);

Insert into seizureRecord (TimeOfSz,TypeOfSz,FeaturesOfSz,LengthOfSz) values ('10','10','10');

select * from seizureRecord;

/*
add the date of seizure column
add time_stamp

///make the time a time data type


*/

/*
cd database // to Enter the database folder
sqlite3 seizureRecord.db ///Execute the serizureRecord.db file using the compiler sqlite3 using bin option [first option]


drop table seizureRecord
b



*/
