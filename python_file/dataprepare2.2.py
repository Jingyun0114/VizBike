import sqlite3 as lite
import sys
import os 
import csv
import urllib
import datetime
import numpy as np
import json
############################ map

f = open('D:/Users/zjy/documents/bikeshare/2015_Q3.csv')
csv_f = csv.reader(f)
next(csv_f,None) #skip the headers

start_day = dict()
stop_day = dict()
from_station =dict() #station_id
to_station = dict()

for row in csv_f:
     starttime = datetime.datetime.strptime(row[1],"%m/%d/%Y %H:%M") 
     day = starttime.strftime("%w") #%w --Weekday as a decimal number [0(Sunday),6].
     if day == '0' :
         day = '7' ##mark Sunday = 7 instead of 0
       
     #print day
     stoptime = datetime.datetime.strptime(row[2],"%m/%d/%Y %H:%M") 
     day2 = stoptime.strftime("%w") #%w --Weekday as a decimal number [0(Sunday),6].
     if day2 == '0' :
         day2 = '7' ##mark Sunday = 7 instead of 0
     
     #print day2
     if row[5] and row[7] and (row[5] != '1050') and (row[5] !='1051') and (row[5]!='1055') and (row[7] != '1050')and(row[7] != '1051') and (row[7] !='1055'):
       from_station[row[0]] = row[5]
       to_station[row[0]] = row[7]
       start_day[row[0]] = int(day)
       stop_day[row[0]] = int(day2)
       
print start_day['13114217']
print stop_day['11714480']
print from_station['11714480']
print to_station['11714480']


con = None

## Creates a folder for the database
## Set directory to YOUR computer and folder
directoryForDB = "D:/Users/zjy/documents/DBClass/"
if not os.path.exists(directoryForDB):
	os.makedirs(directoryForDB)

directoryForDB = directoryForDB + "bikeshare2015Q3.db"
## If database does not exist, creates items
## If database does exist, opens it
con = lite.connect(directoryForDB)

##### add data  table--trip count
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS mapstation") 
	cur.execute("CREATE TABLE mapstation(tripid TEXT, startday INT, stopday INT, fromstation text, tostation text)")
		     
	for key in start_day:
		insertStatement = """INSERT INTO mapstation(tripid, startday, stopday, fromstation, tostation) VALUES ( '%s','%d','%d','%s','%s')""" % (key,start_day[key],stop_day[key],from_station[key],to_station[key])
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()
	
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS mapstation_from") 
	cur.execute("CREATE TABLE mapstation_from(startday INT, fromstation text, num INT)")
	cur.execute("SELECT startday, fromstation, count(tripid) FROM mapstation GROUP BY startday, fromstation")
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO mapstation_from(startday, fromstation, num) VALUES ('%d','%s','%d')""" % (int(row[0]),row[1],int(row[2]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()
	
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS mapstation_to") 
	cur.execute("CREATE TABLE mapstation_to(stopday INT, tostation text, num2 INT)")
	cur.execute("SELECT stopday, tostation, count(tripid) FROM mapstation GROUP BY stopday, tostation")
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO mapstation_to(stopday, tostation, num2) VALUES ('%d','%s','%d')""" % (int(row[0]),row[1],int(row[2]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()		    	    

with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS mapstation_fromto") 
	cur.execute("CREATE TABLE mapstation_fromto(station text, day INT, arrivals INT, departures INT, accumulation INT)")
	cur.execute("SELECT fromstation, startday, num2, num FROM mapstation_from join mapstation_to WHERE fromstation = tostation AND startday = stopday")
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO mapstation_fromto(station, day, arrivals, departures, accumulation) VALUES ('%s','%d','%d','%d','%d')""" % (row[0],int(row[1]),int(row[2]),int(row[3]),int(row[2])-int(row[3]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()
	
with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM mapstation_fromto")
        
with open("D:/Users/zjy/documents/bikeshare/mapstation_fromto.csv","wb") as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow([i[0] for i in cur.description])
        csv_writer.writerows(cur)		            
##############test		            	            	            
with con:
	cur = con.cursor()
        cur.execute("SELECT SUM(departures) FROM mapstation_fromto WHERE station ='1000'")
	for record in cur:
	    print record
	cur.execute("SELECT SUM(arrivals) FROM mapstation_fromto WHERE station ='1000'")
	for record in cur:
	    print record	            	            	            