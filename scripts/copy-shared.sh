#!/bin/bash

# Source directories
ALLSOURCE="../aps/shared/src/all"
SERVICESSOURCE="../aps/shared/src/services"

# Destination directories for all sources
ALLDESTINATIONS=(
    "../aps/client/src/shared"
    "../aps/services/auth/src/shared"
    "../aps/services/invoices/src/shared"
    "../aps/services/user/src/shared"
    "../aps/services/profile/src/shared"
)

# Destination directories for services sources
SERVICESDESTINATIONS=(
    "../aps/services/auth/src/shared"
    "../aps/services/invoices/src/shared"
    "../aps/services/user/src/shared"
    "../aps/services/profile/src/shared"
)

# Remove all destination directories at the start
echo "Removing all destination directories..."
for DEST in "${ALLDESTINATIONS[@]}" "${SERVICESDESTINATIONS[@]}"; do
    if [ -d "$DEST" ]; then
        echo "Removing existing directory $DEST..."
        rm -rf "$DEST" # Remove old directory
    fi
done

echo "All old directories removed!"

# Check if ALLSOURCE exists
if [ ! -d "$ALLSOURCE" ]; then
    echo "Source directory $ALLSOURCE does not exist. Exiting..."
    exit 1
fi

# Copy ALLSOURCE to all destinations
echo "Starting copy operations for ALLSOURCE..."
for ALLDEST in "${ALLDESTINATIONS[@]}"; do
    echo "Copying $ALLSOURCE to $ALLDEST..."
    mkdir -p "$ALLDEST" # Create destination directory if it doesn't exist
    cp -r "$ALLSOURCE" "$ALLDEST"
done

echo "Copy all operation completed!"

# Check if SERVICESSOURCE exists
if [ ! -d "$SERVICESSOURCE" ]; then
    echo "Source directory $SERVICESSOURCE does not exist. Exiting..."
    exit 1
fi

# Copy SERVICESSOURCE to services destinations
echo "Starting copy operations for SERVICESSOURCE..."
for SERVICESDEST in "${SERVICESDESTINATIONS[@]}"; do
    echo "Copying $SERVICESSOURCE to $SERVICESDEST..."
    mkdir -p "$SERVICESDEST" # Create destination directory if it doesn't exist
    cp -r "$SERVICESSOURCE" "$SERVICESDEST"
done

echo "Copy services operation completed!"