import sqlite3 as lite
import sys
import os 
import csv
import urllib
import datetime
import numpy as np
import json

f = open('D:/Users/zjy/documents/bikeshare/2015_Q3.csv')
csv_f = csv.reader(f)
next(csv_f,None) #skip the headers

#dic for start_time and from_station_id, key is trip_id
from_station = dict()
to_station = dict()

for row in csv_f:
    if row[5] and row[7] and (row[5] != '1050') and (row[5] !='1051') and (row[5]!='1055') and (row[7] != '1050')and(row[7] != '1051') and (row[7] !='1055'):
       from_station[row[0]] = row[5]
       to_station[row[0]] = row[7]

''' 
print from_station['11714480']
print to_station['11714480']
'''
f1 = open('D:/Users/zjy/documents/bikeshare/Stations2015.csv')
csv_f = csv.reader(f1)
next(csv_f,None) #skip the headers
#dict for station information
station_id = dict()
station_name = dict()
rack = dict()
lat = dict()
lon = dict()
for row in csv_f:
    station_id[row[0]] = row[0]
    station_name[row[0]] = row[1]
    rack[row[0]] = int(row[2])
    lat[row[0]] = row[3] 
    lon[row[0]] = row[4]

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

##### add data  table4--fromstation id and tostation id
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS table4") 
	cur.execute("CREATE TABLE table4(tripid TEXT, fromstation TEXT, tostation TEXT)")
		     
	for key in from_station:
		insertStatement = """INSERT INTO table4(tripid, fromstation, tostation) VALUES ( '%s','%s','%s')""" % (key,from_station[key],to_station[key])
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()

	
##count creat new table5--count the from-to sation num
with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS table5") 
	cur.execute("CREATE TABLE table5(fromstation TEXT,tostation TEXT, num INT)")
	cur.execute("SELECT fromstation,tostation,count(tripid) FROM table4 GROUP BY fromstation, tostation")
	rows = cur.fetchall()
	for row in rows:	    	
	    insertStatement = """INSERT INTO table5(fromstation, tostation, num) VALUES ('%s','%s','%d')""" % (str(row[0]),str(row[1]),int(row[2]))
            cur.execute(insertStatement)	   
        con.commit()
##################################
##table station
with con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS station")
        cur.execute("CREATE TABLE station(stationid TEXT, name TEXT, racks INT,lat TEXT, lon TEXT)")
        for key in station_id:
            insertStatement = """INSERT INTO station(stationid, name, racks, lat, lon) VALUES ('%s','%s','%d','%s','%s')""" % (station_id[key],station_name[key],rack[key],lat[key],lon[key])
            cur.execute(insertStatement)
        con.commit()
##################################

####### creat matrix
n = 50
m = 50
matrix = [[0]*m for i in range(50)]
with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM table5")
	rows = cur.fetchall()
	for row in rows:
	    matrix[int(row[0])-1000][int(row[1])-1000] = row[2]
	    	    
print matrix	    	
#with open("D:/Users/zjy/documents/bikeshare/matrix_Q3.json", "w") as f:
#    json.dump(matrix, f)
######statioin link to itself
with con:
	cur = con.cursor()
	cur.execute("SELECT SUM(num) FROM table5")
	rows = cur.fetchall()
print rows
with con:
	cur = con.cursor()
	cur.execute("SELECT SUM(num) FROM table5 WHERE fromstation = tostation")
	rows = cur.fetchall()
print rows

'''
topstation = dict()
i = 0
while i <= 49:
    j = 0
    result = 0
    while j <= 49:
        result = result + matrix[i][j]
        if i != j:
            result = result + matrix[j][i]
        j = j + 1
    topstation[i] = result 
    i = i + 1
    
print topstation

with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS table6") 
	cur.execute("CREATE TABLE table6(stationid TEXT, num2 INT, stationname TEXT)")
	cur.execute("SELECT stationid, name FROM station")
	rows = cur.fetchall()
	stationname = dict()
	for row in rows:
	    stationname[row[0]] = row[1]
	#print stationname['1000']    	     
	for key in stationname:
		insertStatement = """INSERT INTO table6(stationid, num2, stationname) VALUES ( '%s','%d','%s')""" % (key,int(topstation[int(key)-1000]),stationname[key])
		cur.execute(insertStatement)
		## NEEDED, if not, database does not update
	con.commit()
############ eg: rank['1001'] = 0
rank = dict()	
with con:
        cur = con.cursor()
        cur.execute("SELECT stationid, num2 FROM table6 ORDER BY num2 DESC")
	rows = cur.fetchall()
	i = 0
	for row in rows:
	    rank[row[0]] = i
	    i = i + 1	
#print rank['1000']	

####### creat matrix
n = 50
m = 50
matrix = [[0]*m for i in range(50)]
with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM table5")
	rows = cur.fetchall()
	for row in rows:
	    matrix[rank[row[0]]][rank[row[1]]] = row[2]
	    	    
print matrix    	
with open("D:/Users/zjy/documents/bikeshare/2016Q2matrix_ranking.json", "w") as f:
    json.dump(matrix, f)

'''




##########################################################-------------
'''
with open('D:/Users/zjy/documents/bikeshare/topstation_Q3.csv', 'wb') as csv_file:
    writer = csv.writer(csv_file)
    for key, value in topstation.items():
       writer.writerow([key, value])

with con:
    cur = con.cursor()
    cur.execute("SELECT * FROM table5")  
        
	         
with open('D:/Users/zjy/documents/bikeshare/topstation_all_info_Q3.csv', 'wb') as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow([i[0] for i in cur.description])
    csv_writer.writerows(cur)
    '''
    
   