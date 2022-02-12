<script>
    import supabase from "$lib/db";
    import {goto} from "$app/navigation"
    import {browser} from "$app/env";

    let email = ""
    let password = ""
    let token = ""


    if(browser){
        token = localStorage.getItem("token")
        if(token != null){
            goto("/home")
        }
    }

    async function registrar(){
      const {user,error} = await supabase.auth.signUp({
        email : email,
        password: password
      })
      console.log(user)
    }

    async function login(){
      const {user,session,error} = await supabase.auth.signIn({
        email : email,
        password: password
      })
      if(user.role == "authenticated"){
        //Guardamos en localstorage el token
        localStorage.setItem("token",session.access_token)
        goto("/home") 
      }
    }
</script>

<div class="p-10 card bg-base-200">
  <div class="form-control">
    <label for="email" class="label">
      <span class="label-text">Email</span>
    </label> 
    <input type="text" id="email" bind:value={email} autocomplete="off" placeholder="email" class="input">
    <label for="password" class="label">
      <span class="label-text">Contraseña</span>
    </label> 
    <input type="password" id="password" bind:value={password} placeholder="contraseña" class="input">
    <div class="flex flex-wrap gap-4">
        <button class="btn btn-primary mt-5" on:click={login}>Iniciar Sesion</button>
        <button class="btn btn-secondary mt-5" on:click={registrar}>Registrar</button>
    </div>
  </div>
</div>