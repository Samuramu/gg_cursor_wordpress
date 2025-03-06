<?php
/**
 * Template Name: Website Privacy Policy
 * Description: Template for the alternative Privacy Policy URL
 */

// Redirect to the main privacy policy page
wp_redirect(home_url('/privacy-policy/'), 301);
exit; 