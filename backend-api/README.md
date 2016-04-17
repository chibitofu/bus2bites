Bus2Bites API

#Get Requests

#Seed the DB

1. Make sure that king_county_bus is on the same level as project folder
2. Run rake db:drop
rake db:migrate
rake db:seed < this will get you route and stops for routes 37 and 40

3. rake restaurants:seed (this will use up your google api hits. it will take a few minutes)

# Run the app

rails s




