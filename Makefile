
DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [Macros] Make macros and aliases


.PHONY: build
build: format
	@pnpm build
	
.PHONY: format
format:
	@pnpm format

.PHONY: dev
dev:
	@pnpm dev

.PHONY: encrypt-env
encrypt-env:
	@cat .env.local.prod | base64 -w 0 > .env.main.base64
	@cat .env.local.stage | base64 -w 0 > .env.stage.base64

.PHONY: sdk-update
sdk-update:
	@pnpm remove @adricq/soky
	@pnpm add @adricq/soky --registry https://npm.adric.me
