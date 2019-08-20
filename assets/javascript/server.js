/*
DATA STRUCTURE

plans (collection)
    auto-ID (document)
        organizer {name: (string), email: (string)}
        week (string)
        title (string)
        urlHash (string)
        numRecipients (int)
        responses (collection)
            responseN (document)
                name (string)
                availableTimes : {Sun : [8-10, 2-3], Sat: ...}
*/

const createEvent = (id) => {
    let hashids = new Hashids("event salt");
    let urlHash = hashids.encode(id);

    
    return urlHash;
}