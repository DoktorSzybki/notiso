export type EventModel = EventBroadcast | Event
	
type EventBroadcast = {
	broadcast: true,
	name: string,
	payload: string
}

type Event = {
	rooms: string[],
	name: string,
	payload: string
}
