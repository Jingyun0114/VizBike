import sqlite3 as lite
import sys
import os 
import csv
import urllib
import datetime
import numpy as np
import json

#######################################trip count, duration count

f = open('D:/Users/zjy/documents/bikeshare/2015_Q3.csv')
csv_f = csv.reader(f)
next(csv_f,None) #skip the headers

start_day = dict()
duration = dict()
user_type = dict()

for row in csv_f:
     starttime = datetime.datetime.strptime(row[1],"%m/%d/%Y %H:%M") 
     day = starttime.strftime("%w") #%w --Weekday as a decimal number [0(Sunday),6].
     if day == '0' :
         day = '7' ##mark Sunday = 7 instead of 0
     start_day[row[0]] = int(day)     
     if row[0]:
        user_type[row[0]] = row[9] ##4 types
     else:
        user_type[row[0]] = 'NA'
     
     if int(row[4]) <= 600:
         duration[row[0]] = 10
     elif int(row[4]) <= 1200:
         duration[row[0]] = 20
     elif int(row[4]) <= 1800:
         duration[row[0]] = 30         
     elif int(row[4]) <= 2400:
         duration[row[0]] = 40
     elif int(row[4]) <= 3000:
         duration[row[0]] = 50
     elif int(row[4]) <= 3600:
         duration[row[0]] = 60  
     elif int(row[4]) <= 4200:
         duration[row[0]] = 70          
     elif int(row[4]) <= 4800:
         duration[row[0]] = 80                      
     elif int(row[4]) <= 5400:
         duration[row[0]] = 90 
     else:
         duration[row[0]] = 100
                                      
'''
print user_type['11714909']   
print duration['11714909']   
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
##########  duration
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS duration") 
	cur.execute("CREATE TABLE duration(tripid TEXT, startday INT, usertype text, duration INT)")
		     
	for key in start_day:
		insertStatement = """INSERT INTO duration(tripid, startday, usertype,duration) VALUES ( '%s','%d','%s','%d')""" % (key,start_day[key],user_type[key],duration[key])
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()    
######################

##########  customer
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS duration_cus") 
	cur.execute("CREATE TABLE duration_cus(startday INT, duration INT, num INT)")
	cur.execute("SELECT startday, duration, count(tripid) FROM duration WHERE usertype = 'Customer' GROUP BY startday, duration")	     
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO duration_cus(startday, duration,num) VALUES ( '%d','%d','%d')""" % (int(row[0]),int(row[1]),int(row[2]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()    
#########   subscriber
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS duration_sub") 
	cur.execute("CREATE TABLE duration_sub(startday2 INT, duration2 INT, num2 INT)")
	cur.execute("SELECT startday, duration, count(tripid) FROM duration WHERE usertype = 'Subscriber' GROUP BY startday, duration")	     
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO duration_sub(startday2, duration2,num2) VALUES ( '%d','%d','%d')""" % (int(row[0]),int(row[1]),int(row[2]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()
#########  combine
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS duration_result") 
	cur.execute("CREATE TABLE duration_result(day INT, duration INT, customer INT,subscriber INT)")
	cur.execute("SELECT startday, duration, num, num2 FROM duration_cus join duration_sub where startday = startday2 AND duration = duration2")
	rows = cur.fetchall()
	for row in rows:
	    insertStatement = """INSERT INTO duration_result(day, duration, customer, subscriber) VALUES('%d','%d','%d','%d') """%(int(row[0]),int(row[1]),int(round(row[2]*1.0/13)),int(round(row[3]*1.0/13)))
	    cur.execute(insertStatement)
	con.commit()

		
############  csv file
for j in range(1, 8):
    with con:
        cur = con.cursor()
        selectStatement = "SELECT duration, customer, subscriber FROM duration_result where day = %d" %j
        cur.execute(selectStatement)
        
    with open("D:/Users/zjy/documents/bikeshare/duration_day{}.csv".format(j),"wb") as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow([i[0] for i in cur.description])
        csv_writer.writerows(cur)

		
	