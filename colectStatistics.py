import random

def get_random_req_type():
	req_types = ["POST","GET","DELETE"]
	index_random = random.randint(0,2)

	return req_types[index_random]

def get_random_interval():
	intervals = [1,5,10]
	index_random = random.randint(0,2)

	return intervals[index_random]

def get_random_req_number():
	req_numbers = [50,100,200]
	index_random = random.randint(0,2)

	return req_numbers[index_random]

def run_requests(req_number, interval, req_type, url):
	for i in range(req_number):
		# do the request
		pass

def colect_statistics():
	req_number = get_random_req_number()
	interval = get_random_interval()
	req_type = get_random_req_type()



def __main__:
	colect_statistics():