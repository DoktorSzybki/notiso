import fetch from 'node-fetch';

export async function verify(data: any) {
	if ("token" in data && typeof data.token == "string") {
		const response = await fetch(`https://authservice?api_token=${data.token}`)
		if (response.status != 200) {
			throw "error"
		}	
	} else {
		throw "error"
	}		
}
