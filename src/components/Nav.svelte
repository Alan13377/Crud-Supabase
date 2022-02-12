<script>
	import supabase from '$lib/db';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	let salir = false;
	let token = '';

	if (browser) {
		token = localStorage.getItem('token');
	}

	$: {
		if (token == null) {
			salir = false;
		} else {
			salir = true;
		}
	}

	async function signOut() {
		salir = false;
		localStorage.removeItem('token');
		await supabase.auth.signOut();
		goto('/');
	}
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="flex-none px-2 mx-2">
		<span class="text-lg font-bold"> CRUD SUPABASE </span>
	</div>
	<div class="flex-1 px-2 mx-2">
		<div class="items-stretch hidden lg:flex">
			{#if salir}
				<a href="/home" class="btn btn-ghost btn-sm rounded-btn"> Home </a>
				<a href="/home/post" class="btn btn-ghost btn-sm rounded-btn"> Post </a>
				<a href="/" on:click={signOut} class="btn btn-ghost btn-sm rounded-btn"> Salir </a>
			{/if}
		</div>
	</div>
</div>
