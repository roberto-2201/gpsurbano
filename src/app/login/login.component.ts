import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    console.log(form.value);
    if (form.value.email === "sudo" && form.value.contrasena === "22001") {
      localStorage.setItem("email", form.value.email);
      this.router.navigate(["/unidades"]);
    }

  }
}
