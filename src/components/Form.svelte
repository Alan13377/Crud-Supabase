<script>
	import supabase from '$lib/db';
	import { browser } from '$app/env';
	import { getNotificationsContext } from 'svelte-notifications';
	import { goto } from '$app/navigation';
	const { addNotification } = getNotificationsContext();

	//Traemos el email
	let email = '';
	export let titulo = '';
	export let texto = '';
	export let id = '';
	export let filename = '';
	let file = null;

	if (browser) {
		email = supabase.auth.user().email;
	}

	async function savePost() {
		//Guardar en la tabla post
		const filename = email + '/' + Date.now();
		const image = await supabase.storage.from('imagenes').upload(filename, file, {
			cacheControl: '3600',
			upsert: false
		});
		const { publicURL } = await supabase.storage.from('imagenes').getPublicUrl(filename);

		const newPost = await supabase.from('post').insert({
			//Campo de la tabla
			titulo: titulo,
			texto: texto,
			email: email,
			imagen: publicURL,
			filename: filename
		});
		console.log(newPost.status);
		if (newPost.status === 201) {
			titulo = '';
			texto = '';
			addNotification({
				text: 'Guardado con exito',
				position: 'top-center',
				type: 'success',
				removeAfter: 4000
			});
		}
	}

	async function editPost() {
		if (file == null) {
			const edit = await supabase
				.from('post')
				.update({
					titulo: titulo,
					texto: texto
				})
				.match({ id: id });
			if (edit.status == 200) {
				goto('/home');
			}
		} else {
			const data = await supabase.storage.from('imagenes').remove([filename]);
			const fileName = email + '/' + Date.now();
			const image = await supabase.storage.from('imagenes').upload(filename, file, {
				cacheControl: '3600',
				upsert: false
			});
			const { publicURL } = await supabase.storage.from('imagenes').getPublicUrl(filename);
			const edit = await supabase
				.from('post')
				.update({
					titulo: titulo,
					texto: texto,
					filename: fileName,
					imagen: publicURL
				})
				.match({ id: id });
			if (edit.status == 200) {
				goto('/home');
			}
		}
	}

	function getFile(e) {
		file = !!e.target.files.length && e.target.files[0];
	}
</script>

<div class="form-control">
	<label for="titulo" class="label"><span class="label-text">Titulo</span></label>
	<input
		type="text"
		bind:value={titulo}
		id="titulo"
		placeholder="Titulo"
		autocomplete="off"
		class="input input-primary input-bordered"
		required="true"
	/>
	<label for="texto" class="label"><span class="label-text">Contenido</span></label>
	<textarea
		id="texto"
		bind:value={texto}
		class="textarea h-24 textarea-bordered textarea-primary"
		placeholder="Contenido"
		required="true"
	/>
	<label for="imagen" class="label"><span class="label-text">Imagen</span></label>
	<input type="file" id="imagen" on:change={getFile} />
	<input type="hidden" bind:value={id} />
	{#if id == ''}
		<button class="btn btn-secondary mt-3" on:click={savePost}>Guardar Post</button>
	{:else}
		<button class="btn btn-secondary mt-3" on:click={editPost}>Editar Post</button>
	{/if}
</div>
