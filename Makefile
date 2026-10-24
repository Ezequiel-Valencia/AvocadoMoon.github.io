.PHONY: dev build test check lint fmt

dev:
	npm run dev

build:
	npm run build

test:
	npm test -- --run

check:
	npm run check
	npm run lint
	npm run format:check
	npm test -- --run

lint:
	npm run lint

fmt:
	npm run format
