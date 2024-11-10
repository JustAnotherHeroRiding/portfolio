# Removing Jank with React-Query

## **What is Rate Game?**

Rate Game is an app that allows users to rate and share their thoughts about a sports game that they have watched and join a community of other sports fans doing just the same.

It was built this year with a very short time scope in order to be ready for March Madness, the tournament that decides the college basketball champion. The iOS exclusive MVP was ready in time, and one thing was confirmed: There is a place for Rate Game in the App Store.

That kickstarted the journey that led to me writing this story, a tale as old as time. We quickly added the NBA playoffs, got ready for the MLB regular season, redesigned the onboarding at least 3 times, and the entire app once.
As the start dates of the other popular sports leagues came nearer and nearer, we took one big swing and implemented College Football, the Premier League, NFL in July. The last league we added is the NHL which  now means we will have an active league any time of the year.
Between working on adding each league, we added reminders that you can set on each upcoming or live game, a spoiler mode, added a Home screen and so on...
After 6 months of working on features, there was a problem: The app got unbearably slow on my almost 3 year old Samsung, my personal metric for app performance.

---

### **Why so slow?**

There was no reason for the app to be as slow as it was. I have never had issues using more intensive apps on the same phone, so we must be doing something wrong and it had to change.
I got the green light to take a full week and 2 extra days to start digging. What I found horrified me. 3 separate listeners for live and upcoming games but only one being used, all of them updating and being up to date with the server state anyway. This was just the start.

#### **The Big One**

We use React Native, and implemented a bottom navigation bar as most apps do. The main trigger for fetching server data is changing the sports league that you want to rate games on, and due to the way the bottom nav works, 4 out of 5 screens would always fetch the data at the same time(the fifth being a settings screen), in addition to the three live and upcoming game listeners all subscribing at the same time.
We had a custom fetch function for each screen, all of which had their own custom loading logic which was not always the same and we did not dare handle caching as we did not have all eternity to get it right.

While this may not sound like it would cause a serious slowdown, 10 concurrent GET requests, containing 15 to 20 game or rating objects, sometimes duplicated, destroyed my phone on each league switch.

So our problems are server state, caching(the absence of), unnecessary requests firing off and inconsistent loading logic.
What did I do about it?

---

### **Introducing React Query**

The first time I read their [overview](https://tanstack.com/query/latest/docs/framework/react/overview) I became a zealot and they explain their raison d'etre much better than I could. In short it does all the heavy lifting when it comes to managing server state and never having to write another useState hook for loading.

The extremely easy set up and plug and play nature of the library led me to getting to work on replacing our data requests in less than a minute.

---

### **Before and After**

#### **Before**

To fetch the top rated games, before we had fetch function wrapped in a useEffect with the league as the dependency, which contained more than one fetch function. Every screen on the bottom navigator had a similar version of this hook, triggering with each league change after the initial fetch.
In addition, each screen had their refresh and infinite scroll functions, states to track the refreshing, loading or fetching the next page of data. What's worse, each screen had their own way of accomplishing all or some of these tasks, leading to strange screen specific bugs.

#### **After**

The bulk of the work was refactoring every custom fetch function into a `useQuery` hook.

```typescript

export const useTopRatedGames = ({ userId, league }: ITopRatedGamesProps) => {

const { isFocused } = useQueryFocusAware();

const { data: { filters, sort, keyword },
} = useGamesSearchContext();
const query = useQuery({ queryKey: gameKeys.topRated(userId, league, { filters, sort, keyword }),
queryFn: () => fetchTopRatedGames({ filters, sort, keyword }, league, 'ratings.weightedRating.avg:desc', '10' ),
enabled: isFocused,
});
return { ...query };
};

```

The fetch function is the same one as before, a simple get request to our REST API that returns the games with the provided filters. The main character in this transformation is the `useQueryFocusAware()`, a custom hook checking if the screen is currently focused. The query will never fire if we are not viewing that screen currently, fixing our league swapping problem.

Here is hook itself:

```typescript
import { useFocusEffect } from '@react-navigation/native';
import { useRef, useCallback, useState } from 'react';

export function useQueryFocusAware() {

const [isFocused, setIsFocused] = useState(true);

useFocusEffect(
    useCallback(() => {
        setIsFocused(true);
        return () => {
            setIsFocused(false);
        };
    }, [])
);

return { isFocused };
}

```

---

### **Final Thoughts**

Every refactor has good intentions behind it, but it can often lead to more issues than it has solved. My biggest fear was undoing all the work we put into fixing bugs on our existing codebase or even causing newer and harder to fix ones.

Before going live, we had our longest testing period to make sure that was not the case.

When I open the app now on the same phone I feel that I am using a polished app with years of work behind it. Changing leagues or screens feels smooth and fast, going back to a league, visiting the same profile or game that was already opened before is almost instant due to the data being cached and when I do see a loading skeleton, it works the same no matter the current screen.

I no longer see Rate Game as an MVP, but a polished and fully realized product that I can feel confident expanding upon as I know that the foundation is rock solid.

The beauty of React is that tools such as React-Query exist, allowing us to focus on building our product, and not writing the perfect loading state management logic or wasting weeks on setting up our own cache.
