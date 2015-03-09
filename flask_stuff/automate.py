# cuz im too lazy to learn bash
import subprocess
import os


def run_test_write_to_json(test, person):

	args = ['python',
			'utils_test.py',
			'-t',
			test,
			'-u',
			person,
			'-c',
			'1000',]
	subprocess.call(args)

def main():
	tests = ["weight", "temp", "SPO2", "hr", "hr2", "pain", "hemo", "sbp", "sbp2", "steps", "sleep", "mood", "energy", "prothtime", "sleep_eff", "glucose"]
	pplz = ["a101", "a102", "a103", "a104", "a105"]
	for test in tests:
		for person in pplz:
			run_test_write_to_json(test, person)

if __name__ == '__main__':
	main()


