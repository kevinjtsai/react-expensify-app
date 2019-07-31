package main

import (
	"fmt"
	"math"
)

/* Go Basic Types
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32, represents a Unicode code point

float32 float64

complex64 complex128 */

func add(x int, y int) int { //type comes after var name
	return x + y
}

//when two+ params share the same type, we can omit explicitly defining except for the last param
func swap(x, y string) (string, string) { //swap returns two strings
	return y, x
}

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return //return statement withour arguments is known as a naked return
}

func sqrt(x float64) string {
	if x < 0 { 													//if statement
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(math.Pi) //Pi is an exported name from the math package

	fmt.Println(add(42, 13))

	d, e := swap("hello", "world")
	fmt.Println(d, e)

	fmt.Println(split(17))

	var j, k int = 1, 2
	var c, python, java = true, false, "no!" //type can be omitted when an initializer is present
	fmt.Println(j, k, c, python, java)

	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s) //0 0 false "" - vars declared without initial value are given their zero value

	var x, y int = 3, 4
	var float float64 = math.Sqrt(float64(x*x + y*y)) //explicit conversion is required
	var z uint = uint(float) //explicit conversion is required
	fmt.Println(x, y, z)

	sum := 0
	for i := 0; i < 10; i++ { //for loop - init and post statements are optional
		sum += i
	}
	fmt.Println(sum)

	for sum < 1000 { //while loop
		sum += sum
	}
	fmt.Println(sum)

}


