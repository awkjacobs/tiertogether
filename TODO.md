# TODO Items

[x] remove the auth0 stuff
[x] set up invite button
[X] create invite page
[X] create share link for invites
[X] look into QR codes for share link invites
[X] change invitation accepted to link to users
[X] invite link singup throwing prisma create user error
[X] update name on new user not changing in profile button
[X] deal with multiple instances of the same item on different boards
[X] moving now sets the rank but then sets it back to the original
[X] correct score display
[X] add numbers to ranks
[X] change server diff to top right
[X] maybe change tier colors
[X] redesign the item info dialog
[X] fix slider
[X] NewBoard dialog invite users?
[X] finish remove user from boards button
[X] add card scale options
[X] invites are broken
[X] add created at to notifications
[X] move items from any removed rows back to queue
[X] server average ranks seem wrong
[X] redo items to reduce the amount of data in db, switch to fetching with cache
[X] deal with invalid date for last air date - Search Card
[X] add chart to server ranks
[X] make server ranks repsonsive instead of just tooltips
[X] redo ranking and server stuff, db calls are very slow
[X] replace user vs server ranks with all users and server ranks
[X] try context providers for appData
[X] redo info dialog to use info component for all instances
[X] get production OAuth keys
--- [X] Google
--- [ ] ~~Apple~~ Requires a paid apple developer account, $100/year
--- [X] Microsoft
[ ] fix the Items table id field since it probably isn't unique
[ ] revist theo video about patterns
[ ] add tooltips and maybe shorcuts to buttons
[ ] clean up the landing page
[X] add favicon
[X] add title on each page
[ ] include # of unread notifications in title
[X] make board text into text fields
[ ] redo the scoring system to go top down using length and better score data, allow for scalability
[ ] add list view
[ ] set up local development database https://vercel.com/docs/storage/vercel-postgres/local-development#option-2:-local-postgres-instance-with-docker
[ ] deal with the multiple modals when opening collection cards

[ ] create actual README file

finish notifications
[X] optimize notifications to cut down on db calls and storage
[X] setup mark all as read button
[X] setup click notification to mark as read
[X] add notifications for all applicable actions
--- [X] someone joining a board
--- [X] someone leaving a board
--- [X] someone being kicked from a board
--- [X] new board owner
[X] add date to notifications
[X] add filters to notifications
[ ] serve only a limited number, and use an add button
[ ] simplify the content of the notifications if db space is an issue

[X] uses forms for:
---[X] NewBoard dialog
---[X] EditDialog
---[X] AddDialog
---[X] Accept Invitation

Add Dialog
[X] add pagination
[ ] add more search options

Create Admin Page
[ ] add admin page
[ ] add admin role

Upgrade to next 15
[X] DND-KIT had issues in the upgrade process, used --legacy-deps, may need to revisit if issues persist

[X] Move to seperate repo
