# -*- coding: utf-8 -*-
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
user_type = dict()

for row in csv_f:
     starttime = datetime.datetime.strptime(row[1],"%m/%d/%Y %H:%M") 
     day = starttime.strftime("%w") #%w --Weekday as a decimal number [0(Sunday),6].
     if day == '0' :
         day = '7' ##mark Sunday = 7 instead of 0
     start_day[row[0]] = int(day)     
     if row[0]:
        user_type[row[0]] = row[9] ##4 types
     else:  ##??
        user_type[row[0]] = 'NA'
     
#print user_type['13114217']             
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
	cur.execute("DROP TABLE IF EXISTS tripcount") 
	cur.execute("CREATE TABLE tripcount(tripid TEXT, startday INT, usertype text)")
		     
	for key in start_day:
		insertStatement = """INSERT INTO tripcount(tripid, startday, usertype) VALUES ( '%s','%d','%s')""" % (key,start_day[key],user_type[key])
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()    
######################  overview--三类用户类型数量
with con:
        cur = con.cursor()
        cur.execute("select usertype, count(tripid) as num from tripcount group by usertype")	 
	    
with open("D:/Users/zjy/documents/bikeshare/tripcout_overview.csv","wb") as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow([i[0] for i in cur.description])
        csv_writer.writerows(cur)

#######################     customer
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS tripcount_cus") 
	cur.execute("CREATE TABLE tripcount_cus(startday INT, num INT)")
	cur.execute("SELECT startday, count(tripid) FROM tripcount WHERE usertype='Customer' GROUP BY startday, usertype ")	     
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO tripcount_cus(startday, num) VALUES ('%d','%d')""" % (int(row[0]),int(row[1]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()  
#######################     subsccrier
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS tripcount_sub") 
	cur.execute("CREATE TABLE tripcount_sub(startday2 INT, num2 INT)")
	cur.execute("SELECT startday, count(tripid) FROM tripcount WHERE usertype='Subscriber' GROUP BY startday, usertype ")	     
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO tripcount_sub(startday2, num2) VALUES ('%d','%d')""" % (int(row[0]),int(row[1]))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit() 
####################  combine	
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS tripcount_result") 
	cur.execute("CREATE TABLE tripcount_result(day INT, customer INT, subscriber INT)")
	cur.execute("SELECT startday, num, num2 FROM tripcount_cus join tripcount_sub WHERE startday = startday2")	     
	rows = cur.fetchall()
	for row in rows:
		insertStatement = """INSERT INTO tripcount_result(day, customer, subscriber) VALUES ('%d','%d','%d')""" % (int(row[0]),int(round(row[1]*1.0/13)),int(round(row[2]*1.0/13)))
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()
###################  write the csv
with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM tripcount_result")
        
with open("D:/Users/zjy/documents/bikeshare/tripcount.csv","wb") as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow([i[0] for i in cur.description])
        csv_writer.writerows(cur)	             
	                                       