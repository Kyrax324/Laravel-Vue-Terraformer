export function toThousandFilter(value) {
	
	if(typeof value == 'string'){ return value}

  	return (+value || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}