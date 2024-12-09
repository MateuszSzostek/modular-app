#!/bin/bash

# Source directory
SOURCE="./aps/shared/shared"

# Destination directories
DESTINATIONS=(
    "./aps/client/src"
    "./aps/services/auth/src"
    "./aps/services/invoices/src"
    "./aps/services/event-bus/src"
)

# Check if source directory exists
if [ ! -d "$SOURCE" ]; then
    echo "Source directory $SOURCE does not exist. Exiting..."
    exit 1
fi

# Loop through each destination and copy the source folder
for DEST in "${DESTINATIONS[@]}"; do
    echo "Copying $SOURCE to $DEST..."
    mkdir -p "$DEST" # Create destination directory if it doesn't exist
    cp -r "$SOURCE" "$DEST"
done

echo "Copy operation completed!"