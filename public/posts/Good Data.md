# How we fixed Rate Game's data problem

## Our first attempt

Rate game was released to the public in March 2024 and as does any other product, we needed to track user behaviour and
went with the industry standard: Mixpanel. A freelancer was brought in to help us set up the Activation, Retention and
Acquisition boards, and a General Overview board. These were working great for us and helped us detect drop off in our
onboarding process which we shortened, detect screens that are not used in the bottom nav which we promptly removed. We
did our best to maintain a clean list of events, however as features piled up things got out of control and nobody
wanted to look at mixpanel anymore as we realized multiple times that the data itself was not correct.(more on this in
the problem section) We knew that something had to be done, which is best shown by the 4 data projects on our roadmap, 3
of which were cancelled due to more urgent work that needed to be done such as implementing new sports leagues or
preparing for playoffs.

## The Problem

The entire time we were only half aware of the purpose of product analytics, and our biggest mistake was trying to treat
mixpanel like a database and using it mainly to track and look at stats, but this missed the entire purpose of product
analytics and even the stats themselves were not correct. An example is the ratings submitted event, our primary action.
There are 3 screens where a rating can be submitted, and one of them did not send the rating event, with more than a
couple of similar examples around.
<img src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2Frating-boards.png?alt=media&token=0d6e661c-11cf-4996-95ab-176f4a3a8a77" alt="Rating Mixpanel Boards"/>
Once we realized this, we set an appetite of 2 weeks for the 3rd mixpanel/data project, the first one of the cycle. Two
big goals were set: Importing the correct data from firebase and implementing session replay. Once we can start to trust
the numbers we are looking at and have replays of what our users are doing, we can clean up the events and do product
analytics the Right Way™. Around this period the same freelancer was brought in again to do an audit, however the
problem was not fixable from his side in such a short amount of time and what we got from him was some general advice.
That includes:

- Naming Convention for events
- Create events that track actions instead of negative actions(such as starting the rating process and then going back
  without finishing it)
- Use user id as the distinct id instead of email
- Keep the events list up to date
- Fix duplicated events being sent caused by bugs
- Fix onboarding missing events with an example of what it should look like
- Create separate mixpanel org for dev events
- Send account creation timestamp as a user property I will stop here so that I do not include his entire audit but most
  of what he shared was best practices in the product analytics world, but nothing that would solve our rotten
  foundations.

## False Start

Off we go! Our 3rd attempt at a data project begins, fresh from the audit and full of ideas and new gained knowledge on
how we should turn this ship around.

### First Roadblock

We looked into importing our database into mixpanel to fix the missing data through
[Warehouse Connectors](https://docs.mixpanel.com/docs/tracking-methods/warehouse-connectors). One look at the docs and I
knew this was not going to happen. The sync was an enterprise add-on that would cost us a truckload to have enabled, and
required us to set up a data warehouse for it to work. Rate Game is not at the stage where we can afford to set this up
so I mentioned to the designer that we had to scrap this.

### Second Roadblock

We will not import our database, however there was still one shining light in front of us that could help us understand
what our users are doing more than any other tool out there.
<img src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2Fmixpanel-replay.png?alt=media&token=36982eaf-1478-434c-a5c6-60199a1314f4" alt="Mixpanel Session Replay"/>
But wait, React Native is not yet supported, and the web implementation will not work. I had one more call with the
designer and I shared the bad news. It was Wednesday, the third day of our 2 week project. The Data project was jinxed
for the third time and we switched our focus to other ventures as there was no point in continuing with our two big
goals scrapped.

## Getting it Right

#### For real this time!

This is where [PostHog](https://posthog.com/) appeared, a newish product analytics provider(and much more) on a mission
to take Mixpanel's lunch. Not only that, they were the only ones that we found that had cracked React Native Session
Replay, which is currently completely free as it is in beta. We decided to take a chance and ditch Mixpanel once and for
all and start with a clean slate, even though PostHog offers a mixpanel import
[script](https://posthog.com/docs/migrate/mixpanel) to transfer our existing events data.

#### What did we do?

Our gospel for the fourth(first successful) Data project was the AARRR framework, also known as Pirate metrics.

<img alt="AARRR Funnel" src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FAARRR.png?alt=media&token=9042841d-5c79-43c1-8fe6-b39e059e7d4a"/>

As our product is not yet monetized and there are no referrals, our focus was on the first 3 steps of the funnel:
Acquisition, Activation and Retention. A document was created where we clearly wrote down the metrics we want to track
from each step, and which tool will be used for which metric so that our mixpanel data sync issues do not come back to
haunt us again and there will be no confusion where to go and look to find what we are looking for.

Two new players entered the picture: [Appsflyer](https://www.appsflyer.com/) which we use exclusively to track app
installs and our [custom dashboard](https://app.rategame.io/dashboard) for stats that we can pull from our database.

#### What was in that document you mentioned?

An abridged version of it looks like this:

- **Acquisition**
  - Bounce Rate(For https://www.rategame.io/) - **Google Analytics**
  - App/Play Store Impressions - **App and Play store analytics**
  - Conversion Rate - **Appsflyer**
  - Channel Effectiveness - **Appsflyer**
- **Activation**
  - Time To value - **Posthog**
  - Onboarding completion Rate - **Posthog**
  - User Activation Rate - **Posthog**
  - User Path after Rating - **Posthog**
- **Retention**
  - User Retention Rate - **Posthog**
  - Churn Rate - **Posthog**
  - Stickiness(DAU/MAU) - **Posthog**
- **General Analytics & Insights**
  - Various app stats such as number of games rated, top and most rated games which are hosted on our **dashboard**
  - DAU - **Posthog**
  - MAU - **Posthog**
- **Feature Adoption**
  - Percentage of users engaging with specific app features- **Posthog**

Pretty good right? No more holes in our knowledge of what our users are doing, and even if we missed something Posthog
is recording all of their sessions for us to watch.

## Implementation

This was the most cathartic part for me personally. Implementing session replay was as painless as adding a provider to
our app and off we went to curate our new list of app events to capture. A great starting point was Posthog's blog on
the [5 events all teams should track](https://posthog.com/blog/events-you-should-track-with-posthog) The TL:DR is:

1. Page/Screen views
2. Sign-Ups
3. Feature Adoption
4. Payments(Not applicable)
5. Invitations or shares(Not applicable) Wait a second, that looks awfully close to the AARRR funnel, right?

We had a workshop with the designer and cut the previous event list which from 110 to 35, most of those being random
input focus/blur events, or events that were not used anymore. As I was working on setting up all the required
dashboards and charts, i had to add/remove/edit some of these, ending up with our final list of 40 events which track
our Screen views, Sign-Ups and feature adoption which is what most of these 40 events are used for.

The dashboard was built by the newest member of the Rate Game team Ivan, and Appsflyer was as painless as adding a new
library and using their dashboard to create links for our creators and campaigns to start tracking installs.

## Final Thoughts

Only time can show the impact of our work in the last 2 weeks. The morale after our end of week Friday meeting was the
highest I have felt so far and personally I have reached a new level of confidence in my own ability as a Product
Engineer. This comes as a result of spending the last month reading everything I can about product analytics and going
through the journey of untangling our initial situation and shaping it into something to be proud off.

If you would like to read about our app wide performance refactor, check out my
[Why React Query](https://justanotherheroriding.cc/writing/why-react-query) blog.
