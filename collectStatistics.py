import random
import http.client
import time
import datetime
from bson import ObjectId
import json

req_types = ["POST","POST","GET"]
time_interval = [1,5,10]
num_of_req = [50, 100, 1000]

def log(message):
	file = "client_log.txt"
	with open(file,'a') as f:
		f.write(message+"\n")


def run_requests():
	# should provide a valid auth token
	headers = {'Content-Type':'application/json', 'x-access-token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzQyNzY2NDhlYzhiMTQ2NGI4YzMyMTUiLCJleHAiOjE0NzE2Njc2MTMzMjh9.txJP6bBUDlveFECR0tx8SJmwrgxD7MGhWK_hgsed5To'}

	for i in range(len(req_types)):
		for k in range(len(time_interval)):
			for j in range(num_of_req[k]):
				conn = http.client.HTTPConnection("http://192.168.25.4",3000)
				if req_types[i] == "GET":
					before = datetime.datetime.now()
					log("%s  started at: %s"%(req_types[i],str(before)))
					conn.request(req_types[i], "/services",headers)
					now = datetime.datetime.now()
					log("%s  finished in : %s\n"%(req_types[i],str(now - before)))
					time.sleep(time_interval[k])
				else:
					before = datetime.datetime.now()
					log("%s  started at: %s"%(req_types[i],str(before)))	
					body = {"name":"pizza %d"%int(random.random()*10),"provider":"574276648ec8b1464b8c3215	"}
					if req_types[i]=="PUT":
						#TODO
						conn.request(req_types[i], "/services/", json.dumps(body), headers)
					else:
						conn.request(req_types[i], "/services", json.dumps(body), headers)
					now = datetime.datetime.now()
					log("%s  finished in : %s\n"%(req_types[i],str(now - before)))
					time.sleep(time_interval[k])

def main():
	run_requests()

if __name__ == "__main__":
	main()