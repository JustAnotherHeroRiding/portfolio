## The good, the Bad and the Janky

Another December rolls around, bringing to us as always the joys of a long running tradition. I am obviously talking
about spotify wrapped, which seems to still be ahead of the curve compared to the many other apps that want to imitate
it(including [ours](https://rategame.io) that we are about to release on December 22nd!)

Whether it's the design, the data shown to us, a fun inclusion like the listening age or the fact that showing the music
we listened to this year gives a very clear picture of who someone is. There's nothing more I would like to see
happening in an app I am working on than seeing users share it, and wrapped seems to knock it out of the park year after
year.

As people were busy sharing their top artists, the top % they belonged to or silently judging other people's
taste(mostly judging personally), what mesmerized me was the beautiful design that reminded me of the Red Room from Twin
Peaks.
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiddfcaBfivV0ZhSgqBKSzxIBFgI23zar7arAJ0dOVDJgsNKzxSCmkWcCuj7dIJoL5Z2Wtu-BQFVeyP5PbVRjUgHu7lA8h1v5Z6xEUb0EYgIhzsDy69D3ssGIrEzCA6cgTAPfxTxZ-bAFA/s1600/Red-Room.jpg" />

That's when I saw it was built with [Rive](https://rive.app/) in this
[tweet](https://x.com/rive_app/status/1996609250559496397). What a coincidence I thought, as at the same time I was in
the middle of implementing our first Rive animations in our app.

Our team has been aware of Rive for a few months, but as we did not have someone who could create the animations, we
worked with a freelancer and now it was time for me to get to work. As always, a plug and play experience is promised
but I know better from years of work that nothing is ever that simple, especially working with react native libraries of
tools built initially for the web.

## The Warning Shot

Before I started work, I did a quick search to see how other people felt after working with Rive and React Native, and
this is when I knew that the initial optimistic estimate of a few days to get all the animations done was not going to
be possible.

These two posts from someone who has been burnt by Rive were what made me think this might not work out.
<img src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FScreenshot%202025-12-14%20at%2017.01.22.png?alt=media&token=e7a59781-19c7-4454-bc83-c8105f3adaa1"/>
<img src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FScreenshot%202025-12-14%20at%2017.01.14.png?alt=media&token=1fb3be07-ca9c-47fc-a9ab-339c50aef945" />
Undeterred, I marched forward and spent 2 whole weeks to implement just 5 animations, 2 of which we scrapped and never
released and the other 3 working almost consistently.

For the rest of the article I will be going through the good and bad sides hoping to save another team's time and
sanity.

## The Good

The performance promises of the Rive runtime delivered, and when compared to our non animated approach or my attempts at
replicating the same animation with reanimated, there were almost no frames dropped compared to the JS or UI fps tanking
to 0 with the previous two approaches, especially on older androids.

<video width="100%" height="400px" controls>
<source src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FScreenRecording_12-14-2025%2017-09-11_1.MP4?alt=media&token=1d617b13-8194-4919-894f-509993f0d4f5" type="video/mp4">
Your browser does not support the video tag. </video> Previously the color of the semicircle only changed when the value
hit 3 breakpoints, to red, yellow or green which resulted in the semicircle circle having to rerender which tanked the
framerate on almost any android phone. Using Rive has resulted in my old Samsung A53 having no issues at all, which is
my biggest personal win to come out of Rive, as it only gets worse from here.

<video width="100%" height="400px" controls>
<source src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FScreenRecording_12-14-2025%2017-14-54_1.MP4?alt=media&token=63c05240-ace8-401a-8e3c-451ef31279b1" type="video/mp4">
Your browser does not support the video tag. </video>

Another great performance boost came when we replaced the older implementation of this branch containing the rating
breakdown, a look at how the fans of each team rated the game compared to the neutrals. Here as above we also had
similar looking circles with, you guessed it, more svgs for the connecting lines which changed color but were otherwise
static and dull. The worst was that they would never line up correctly on all phones as they were manually positioned,
which the rive animation can always guarantee this.

## The Bad

So let's get to the meat of this article, how can 5 animations, 2 of which never released take 2 weeks to build and
ship?

Working with Rive is not like working with someone's designs in a Figma file. Anytime a change was needed, I would have
to stop whatever I was doing and wait for the animator to make the changes needed, whether they were visual, an
additional data property was needed to allow me to control the color or whatever else that might come up. If that
animator is a part of your team then your experience will be much different and I would almost say it's a must.

I'm perfectly capable of changing a couple of colors, padding or adding some basic data bindings to let me control
certain aspects of the animations though, right?

Here is where the arcane interface almost defeated me, someone who has never worked with animations before. I did manage
to make some of these changes myself, however even the most basic stuff took me hours, and I would simply get stuck when
it came to more complex stuff. Claude was of no help at all here no matter how many screenshots I provided and I was not
about to become an animator just to get this done.

Even the designers could not manage, leaving us to wait for the freelancer to make the changes to let me continue.

Nothing kills momentum more than waiting on someone.

## The Janky

So why did we scrap 2 animations?

One of them was a like animation that just wouldn't work reliably. As we all know, a like icon needs to have two states:
active and inactive. A user could have already liked that post or has not. The animation needs to be able to start as
active, or inactive and it needs to reliably switch between these two states.

After a few days of testing and way too much time trying all the hacks in my bag of tricks, I still kept getting bug
reports that a post that was already liked showed the animation in it's inactive state.

Here is the moment when I decided to call it quits and implement a custom reanimated based animation instead.
<img src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FScreenshot%202025-12-14%20at%2017.39.43.png?alt=media&token=a84369e7-ca8d-46ee-9ecb-f6b70a3e51ef" />

The other animation was meant as a replacement to the simple toast message showing up at the bottom after you
successfully rate a game, showing you how much RGS you gained (Rate Game Score, our in-app system of assigning value to
user activity with higher quality submissions getting more score)

<video src="https://firebasestorage.googleapis.com/v0/b/rate-game-dev.appspot.com/o/data%2FScreen%20Recording%202025-12-14%20at%2017.46.16.mov?alt=media&token=6349bf98-a4c5-4302-926d-693116641bc1" type="video/mp4"
controls /> The feedback from Nick, RateGame's founder was that he felt as if this animation was part of a pirated
version of our app and someone tacked this on top. Almost a week after deciding to scrap it, I tend to agree as it did
not fit in with the rest of our look. I replaced this by bringing back the toast message, added some movement to it by
making it fade in and move up to it's position on the bottom, grow as the number increases and then fade out.

Here's a rapid fire round of jankiness:

- the animations have a tendency to disappear and reappear later on, or not at all
- the hooks provided by the rive library almost never work and forced me to rely on magic with my own ref attached to
  the rive component
- an absolutely positioned parent container was almost always needed to guarantee the animation will be where I want it
  to be
- a minimum height is also needed matching the height of the animation itself to ensure a consistent layout
- there is no way to know if the animation has initialized or not. Ended up using timeouts before I start trying to do
  anything with the rive ref
- the animated slider breaks at the slightest disturbance(a tiny scroll up or down if in a scroll container, the native
  bottom sheet dismiss or overscrolling on ios)
- changing a data property does not guarantee the animation will rerender to update together with the new state. A way
  to "excite" the animation was needed so I ended up using "touchBegan" and "touchEnded" on the ref
- the fireState method to use a trigger causes a crash on android every time
- Our crashlytics reported an android startup crash that I haven't been able to reproduce so far

## Will it get better?

It could be that it is simply an awkward transition period as the old react native library has been abandoned for a
while as the team is working on a new [react native library](https://github.com/rive-app/rive-nitro-react-native) with
nitro modules, which just had it's first 0.1.1 release 3 days ago.

I didn't spend much time with it but I hope that it will result in much better DX, as the performance gains from Rive
could be the secret sauce needed for a lightning quick app built with RN.

## The future of animations in RateGame

From now on my philosophy will be to have less ambitious animations and only something I can build with reanimated and
ship relatively quickly as I can't afford another 2 weeks for 3 animations as the sole dev.

The performance is still an improvement over a JS based solution, and in almost all cases, a minimal animation feels
much better as it's something you're going to (hopefully) see every day. A trend I noticed while we were working with
the animator was that we would always start with something crazy, and then strip it down to its core.

If there is one thing to take away from my experience, is that you don't need Rive, and if your team pushes for it then
triple whatever estimation you were about to give.

Fade in is all you need.
