.PHONY: local
local:
	docker-compose -f docker-compose.local.yml --env-file .env.local up --build -d

.PHONY: stop-local
stop-local:
	docker-compose -f docker-compose.local.yml down

.PHONY: prune-local
prune-local:
	docker-compose -f docker-compose.local.yml down && yes | docker volume prune

# Set up development environment
.PHONY: setup
setup:
	python3 -m venv venv && \
	. venv/bin/activate && \
	pip3 install pip==21.0.1 && \
	pip3 install wheel==0.35.1 && \
	pip3 install -r requirements.txt

# Create seeder for development/testing
.PHONY: seed
seed:
	. venv/bin/activate && \
	python3 seed.py

#############################
#			TESTS			#
#############################

.PHONY: test-api
test-api:
	echo "Running Tests for API" && \
	. venv/bin/activate && \
  	cd ./tests/api && pytest .
