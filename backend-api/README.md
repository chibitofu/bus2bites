Bus2Bites API

#Get Requests

/routes/:bus_number

returns JSON containing restaurants along the given route, along with stop information:

`
{
  "data": [
    {
      "restaurant": {
        "id": 727,
        "name": "Il Corvo",
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        "price_level": 2,
        "rating": "4.7",
        "types": "[\"restaurant\", \"food\", \"point_of_interest\", \"establishment\"]",
        "stop_id": 531,
        "created_at": "2016-04-17T07:12:45.178Z",
        "updated_at": "2016-04-17T07:12:45.178Z",
        "lng": "-122.3317576",
        "lat": "47.60246679999999",
        "hours": "[\"Monday: 11:00 AM – 3:00 PM\", \"Tuesday: 11:00 AM – 3:00 PM\", \"Wednesday: 11:00 AM – 3:00 PM\", \"Thursday: 11:00 AM – 3:00 PM\", \"Friday: 11:00 AM – 3:00 PM\", \"Saturday: Closed\", \"Sunday: Closed\"]",
        "address": "217 James St, Seattle, WA 98104, United States"
      },
      "stop": {
        "id": 531,
        "route_id": 100212,
        "created_at": "2016-04-17T06:15:18.988Z",
        "updated_at": "2016-04-17T06:15:18.988Z",
        "name": "\"3rd Ave & James St\"",
        "lat": "47.6026421",
        "restaurant_id": null,
        "lng": "-122.331184"
      }
    }
`

#Seed the DB

1. Download the latest [King County Metro](http://metro.kingcounty.gov/GTFS/) data. Unzip it into a directory called '/king_county_bus' two levels above this directory.
2. Run `rake db:drop; rake db:migrate; rake db:seed'` 
This will seed the DB with estaurants and stops along routes 37 and 40 - working on a more efficient seed script for upcoming routes!
3. Create a `.env` file in '/backend-api', include `GOOGLE_KEY=YourGooglePlacesKey`
4. `Rake restaurants:seed` (this will use up your google api hits. it will take a few minutes)

# Run the app

rails s -p 3000




