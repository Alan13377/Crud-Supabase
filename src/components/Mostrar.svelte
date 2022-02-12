<script>
	import supabase from '$lib/db';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import 'sweetalert2/dist/sweetalert2.css';

	let email = '';
	let post = [];

	if (browser) {
		email = supabase.auth.user().email;
	}

	onMount(async () => {
		let { data } = await supabase.from('post').select('*').order('id', { ascending: false });
		/* .eq('email', email); */
		post = data;
	});

	function alertDelete(id, filename) {
		Swal.fire({
			title: 'Estas seguro de eliminar el Post?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si,eliminar!'
		}).then((result) => {
			if (result.isConfirmed) {
				deletePost(id, filename);
			}
		});
	}

	async function deletePost(id, filename) {
		const data = await supabase.storage.from('imagenes').remove([filename]);
		if (data) {
			await supabase.from('post').delete().match({ id: id });
			location.reload();
		}
	}
</script>

{#each post as item}
	<div class="card shadow-sm bg-accent text-accent-content mt-5">
		<figure>
			<img src={item.imagen} alt={item.titulo} />
		</figure>
		<div class="card-body">
			<h2 class="card-title">{item.titulo}</h2>
			<p>
				{item.texto}
			</p>
			<div class="card-actions">
				{#if email == item.email}
					<a href={`/edit/${item.id}`} class="btn btn-secondary">Editar</a>
					<button class="btn btn-error" on:click={alertDelete(item.id, item.filename)}
						>Eliminar</button
					>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<p>No hay posts....</p>
{/each}
