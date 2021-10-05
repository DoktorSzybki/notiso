export declare type EventModel = EventBroadcast | Event;
declare type EventBroadcast = {
    broadcast: true;
    name: string;
    payload: string;
};
declare type Event = {
    rooms: string[];
    name: string;
    payload: string;
};
export {};
//# sourceMappingURL=event.d.ts.map