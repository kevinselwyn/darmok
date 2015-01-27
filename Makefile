all: test

test: test/helloworld.darmok
	./bin/darmok $< test/helloworld.c
	gcc -o test/helloworld test/helloworld.c
	./test/helloworld

clean:
	rm -f test/helloworld test/helloworld.c
