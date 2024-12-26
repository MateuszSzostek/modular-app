#!/bin/bash

# Source directory
ALLSOURCE="../aps/shared/src/all"

# Destination directories
ALLDESTINATIONS=(
    "../aps/client/src/shared"
    "../aps/services/auth/src/shared"
    "../aps/services/invoices/src/shared"
    "../aps/services/user/src/shared"
)

# Check if source directory exists
if [ ! -d "$ALLSOURCE" ]; then
    echo "Source directory $ALLSOURCE does not exist. Exiting..."
    exit 1
fi

# Loop through each destination and copy the source folder
for ALLDEST in "${ALLDESTINATIONS[@]}"; do
    echo "Copying $ALLSOURCE to $ALLDEST..."
    mkdir -p "$ALLDEST" # Create destination directory if it doesn't exist
    cp -r "$ALLSOURCE" "$ALLDEST"
done

echo "Copy all operation completed!"


# Source directory
SERVICESSOURCE="../aps/shared/src/services"

# Destination directories
SERVICESDESTINATIONS=(
    "../aps/services/auth/src/shared"
    "../aps/services/invoices/src/shared"
    "../aps/services/user/src/shared"
)

# Check if source directory exists
if [ ! -d "$SERVICESSOURCE" ]; then
    echo "Source directory $SERVICESSOURCE does not exist. Exiting..."
    exit 1
fi

# Loop through each destination and copy the source folder
for SERVICESDEST in "${SERVICESDESTINATIONS[@]}"; do
    echo "Copying $SERVICESSOURCE to $SERVICESDEST..."
    mkdir -p "$SERVICESDEST" # Create destination directory if it doesn't exist
    cp -r "$SERVICESSOURCE" "$SERVICESDEST"
done

echo "Copy services operation completed!"