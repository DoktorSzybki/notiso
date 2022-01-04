import Redis from "ioredis"

const redis = new Redis(6379, "redis");

redis.subscribe("event", (error, count) => {
	if (error) {
		console.error("Failed to subscribe");
		console.log(error)
	} else {
		console.log("Success on redis subscribe")
	}
});

export default redis
