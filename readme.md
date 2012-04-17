# Div Fixed Table Header Plugin
Fixed HTML Table Header for HTML table elements. 

You may use this plugin to create a table header inside a DIV container  and, while user scrools down container DIV element (div w/ overflow), header is still visible.

## Usage
* Create a DIV container
* $("#elegibles_table").fixedtableheader(OPTIONS_JSON)
* OPTIONS_JSON must include the key 'container_div_element' with value $(container_div_element) ex: {container_div_element: $('#my_div_id')}

## Additional Option Arguments (passed inside the JSON):
* variable_height: NUMBER - Number of px user scrolled before showing the header inside the div element