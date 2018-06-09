export default { 

	capitalize (value) {
	if (!value) return ''
  	value = value.toString()
  	return value.charAt(0).toUpperCase() + value.slice(1)
	},

	lowercase (value) {
		return value.toLowerCase()
	},

	uppercase (value) {
		return value.toUpperCase()
	}
}