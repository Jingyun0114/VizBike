import sqlite3 as lite
import sys
import os 
import csv
import urllib
import datetime
import numpy as np
import json
############################# top - 10
n = 10
m = 10
matrix = [[0]*m for i in range(10)]
print matrix
f = open('D:/Users/zjy/documents/bikeshare/top10Q3_after_change#.csv', 'rU')
csv_f = csv.reader(f)
for row in csv_f:
    print row[0]
    print row[1]
    matrix[int(row[0])][int(row[1])] = row[2]	    	    
print matrix	    	
with open("D:/Users/zjy/documents/bikeshare/matrix_Q3_top10.json", "w") as f:
    json.dump(matrix, f) 