# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom id column to `Agent` data model
The `Agent` data model (and consequently table) needs an additional column for a custom report id that can be modified by `Facilities` for report generation and general administration tasks. 

@Facilities Team: Please elaborate the data type you want for this new field, so that we can proceed development.

Estimate: 6 hours
Acceptance criteria: `Agent` data model now has column `custom_report_id` which can only be modified by people with `Facilities` level access, data type for new column is to be determined after comment from @Facilities Team.
Implementation:
- Modify existing `Agent` class to include new field `custom_report_id`, including getters and setters where relevant (remember permissions check, as Facilities should be the only ones accessing and modifying this field)
- Create database migration to modify `Agents` table, adding the new `custom_report_id` field

### Ticket 2: Add front-end support for custom report id column in `Agent`
With the new incoming `custom_report_id` column being made we want to modify our frontend to support the modification of this value. Please update the `Agent`-related create and update operations to include this field for members with `Facilities` level permission.

Depends on: #1
Estimate: 4 hours
Acceptance criteria: All `Agent`-related create and update operations now include this field, provided that the user performing the operations have the required access level


### Ticket 3: Modify `getShiftsByFacility` function to include new `Agent` custom report id column
The `custom_report_id` being implemented in #1 requires some mild modification to our `getShiftsByFacility` function: Please ensure that the column `custom_report_id` is included in the metadata passed to the `generateReport` function.

Depends on: #1
Estimate: 1 hour
Acceptance criteria: `getShiftsByFacility` returns `Agent` metadata with column `custom_report_id` included