# About tests
Tests use mongo-mock and are dependent on data in mongoData/data. Ideally they would be refactored and that dependency would be removed (each test would load only data it needs).

Currently each test refreshes mock-mongo data before run.
