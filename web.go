package main

import (
	"log"
	"net/http"

	"github.com/micro/go-micro/web"
)

func main() {
	service := web.NewService(
		web.Name("go.micro.web.status"),
		web.Address(":8080"),
		web.Handler(http.FileServer(http.Dir("."))),
	)
	// parse command line
	service.Init()
	// run the service
	log.Fatal(service.Run())
}

