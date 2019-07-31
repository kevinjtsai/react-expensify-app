/* WHERE VS HAVING
- WHERE IS USED TO DO INITIAL FILTER & HAVING IS USED FOR FINAL FILTER
- WHERE clause is used for filtering rows and it applies on each and every row, while HAVING clause is used to filter groups in SQL. */

SELECT * FROM myDB.students
WHERE graduation_year = 2019;

SELECT COUNT(studentId), country FROM myDB.students
WHERE country != "INDIA" GROUP BY country
HAVING COUNT(studentID) > 5;


/* The UNION operator combines and returns the result-set retrieved by two or more SELECT statements.
The MINUS operator in SQL is used to remove duplicates from the result-set obtained by the second SELECT query from the result-set obtained by the first SELECT query and then return the filtered results from the first.
The INTERSECT clause in SQL combines the result-set fetched by the two SELECT statements where records from one match the other and then returns this intersection of result-sets.*/

SELECT name FROM Students 	 /* Fetch the union of queries */
UNION
SELECT name FROM Contacts;

SELECT name FROM Students 	 /* Fetch the union of queries with duplicates*/
UNION ALL
SELECT name FROM Contacts;

SELECT name FROM Students 	 /* Fetch names from students */
MINUS 				/* that aren't present in contacts */
SELECT name FROM Contacts;

SELECT name FROM Students 	 /* Fetch names from students */
INTERSECT 			/* that are present in contacts as well */
SELECT name FROM Contacts;

