import sqlite3 as lite
import sys
import os 
import csv
import urllib
import datetime

f = open('D:/Users/zjy/documents/bikeshare/2015_Q3.csv')
csv_f = csv.reader(f)
next(csv_f,None) #skip the headers

#dic for start_time and from_station_id, key is trip_id
start_day = dict()
start_hour = dict()
from_station_id = dict()

for row in csv_f:
     #print row[1]
     starttime = datetime.datetime.strptime(row[1],"%m/%d/%Y %H:%M") 
     day = starttime.strftime("%w") #%w --Weekday as a decimal number [0(Sunday),6].
     if day == '0' :
         day = '7' ##mark Sunday = 7 instead of 0
     hour = starttime.strftime("%H")
     #print day
     #print hour     
     start_day[row[0]] = int(day)     
     start_hour[row[0]] = int(hour)+1  #0-1:1
     from_station_id[row[0]] = row[5]

''' 
print start_day['13565048'] #Sunday    
print start_day['11713543']
print start_hour['11713543']
print from_station_id['11713543']
'''

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

##### add data  table1--starttime and fromstationid
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS table1") 
	cur.execute("CREATE TABLE table1(tripid TEXT, startday INT, starthour INT, fromstationid text)")
		     
	for key in start_day:
		insertStatement = """INSERT INTO table1(tripid, startday, starthour, fromstationid) VALUES ( '%s','%d','%d','%s')""" % (key,start_day[key],start_hour[key],from_station_id[key])
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()

	
##count creat new table2
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS table2") 
	cur.execute("CREATE TABLE table2(day INT,hour INT,value INT, fromstationid text)")
	cur.execute("SELECT startday,starthour,count(tripid),fromstationid FROM table1 GROUP BY startday,starthour,fromstationid")
	rows = cur.fetchall()
	for row in rows:	    	
	    if row[3]:
	       insertStatement = """INSERT INTO table2(day, hour, value, fromstationid) VALUES ('%d','%d','%d','%s')""" % (int(row[0]),int(row[1]),int(row[2]),str(row[3]))
	       cur.execute(insertStatement)	   
        con.commit()

with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM table2")
        
with open("D:/Users/zjy/documents/bikeshare/out.csv","wb") as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow([i[0] for i in cur.description])
        csv_writer.writerows(cur)