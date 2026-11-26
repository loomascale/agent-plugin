.PHONY: zip bump

# Build dist/<plugin>.zip for every plugin (OpenAI "Create draft from ZIP").
zip:
	bash scripts/build-openai-zip.sh

# Bump the patch version of every plugin manifest and marketplace entry.
bump:
	node scripts/bump-patch.mjs
