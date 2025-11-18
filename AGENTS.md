# Repository Guidelines

## Project Structure & Module Organization
- Root docs (`README.md`, `INSTALL.md`, `BUILD.md`, `USE.md`) explain setup; follow them before local changes.
- `interface/` hosts the main app: `html/` static UI and JS, `protocol.proto` for gRPC definitions, `server/` Go gRPC backend with cgo window bindings, `proxy/` for grpcwebproxy wiring, and helper scripts (`install`, `build`, `run`, `stop`).
- `momo/` is a submodule for WebRTC streaming; `momo/build/build.sh` compiles platform targets.
- `tools/` holds auxiliary scripts; avoid committing generated artifacts (`interface/server/a.out`, cgo builds).

## Build, Test, and Development Commands
- Install dependencies (Node, Go tooling, grpc-web proxy, TypeScript helpers): `cd interface && ./install`.
- Build interface stack (cgo window lib + Go server): `cd interface/server && ./build`; rebuild after proto updates or cgo changes.
- Build whole interface bundle including proxy: `cd interface && ./build`.
- Initialize/update streaming dependency: `git submodule update --init --recursive`.
- Build momo target (Ubuntu example): `cd momo/build && ./build.sh ubuntu-18.04_x86_64`.
- Run locally: `cd interface && ./run` (starts Go server on `:9090` and grpcwebproxy on `:8081`); stop with `./stop`.

## Coding Style & Naming Conventions
- Go: run `gofmt` before committing; keep package paths short and lower case; exported identifiers use PascalCase, locals camelCase. Favor clear error handling over silent failures.
- Proto/GRPC: prefer consistent Request/Reply message naming; regenerate stubs after schema edits via `interface/protoc.sh` and rerun `./build`.
- JS/TS in `interface/html`: use camelCase for variables, kebab-case for scripts; keep DOM IDs descriptive and short.

## Testing Guidelines
- No automated suite is present; add Go tests alongside code as `_test.go` and run with `cd interface/server && go test ./...`.
- For UI changes, manually exercise `interface/html` through the emulator + grpcwebproxy path launched via `interface/run`; verify touch/move/end flows and window targeting.
- When adding proto changes, validate generated code compiles for both Go server and browser client.

## Commit & Pull Request Guidelines
- History shows short, imperative commits (e.g., “update submodule”, “fix”); continue using concise summaries with context (English or Japanese ok).
- Reference issues when possible and describe user-facing impact; include screenshots or terminal output for UI/behavioral changes.
- Before opening a PR, ensure `./build` succeeds, submodules are updated, generated files are excluded, and note any platform assumptions (e.g., DISPLAY=:0, Ubuntu 18.04).

## Security & Configuration Tips
- Default ports: grpcwebproxy `8081`, backend `9090`; adjust if they conflict with momo/8080.
- gRPC server expects the emulator window named “Ultima”; keep `xdotool` and display environment configured (DISPLAY=:0). Avoid committing secrets or local build outputs. 
