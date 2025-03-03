#!/bin/bash

# Backup existing configurations if they exist
if [ -f /etc/apache2/sites-available/000-default.conf ]; then
    sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.backup
fi

if [ -f /etc/apache2/sites-available/ggtude.com-le-ssl.conf ]; then
    sudo cp /etc/apache2/sites-available/ggtude.com-le-ssl.conf /etc/apache2/sites-available/ggtude.com-le-ssl.conf.backup
fi

# Copy new configurations
sudo cp ./000-default.conf /etc/apache2/sites-available/
sudo cp ./ggtude.com-le-ssl.conf /etc/apache2/sites-available/

# Ensure Apache modules are enabled
sudo a2enmod ssl
sudo a2enmod headers
sudo a2enmod rewrite

# Enable the sites if not already enabled
sudo a2ensite 000-default
sudo a2ensite ggtude.com-le-ssl

# Test configuration
sudo apache2ctl configtest

# If test passes, reload Apache
if [ $? -eq 0 ]; then
    sudo systemctl reload apache2
    echo "Apache configuration updated successfully"
else
    echo "Apache configuration test failed"
    exit 1
fi