<script>
    import ChevronDown from "lucide-svelte/icons/chevron-down";

    import { Root, Trigger, Content, Item } from "$lib/components/ui/dropdown-menu/index";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<Root>
    <Trigger asChild let:builder>
        <Button builders={[builder]} variant="default" class="dark:text-foreground">
            Contribute
            <ChevronDown size={16} />
        </Button>
    </Trigger>
    <Content class="w-64">
        <Item>
            <a class="w-full h-full" href="/doc/how-to-contribute">
                Overview
            </a>
        </Item>
        <Item>
            <a class="w-full h-full" href="/doc/create-api-mocks">
                Create API mocks and tests suite
            </a>
        </Item>
        <Item>
            <a class="w-full h-full" href="/doc/package-api-mocks">
                Package API mocks and tests suite
            </a>
        </Item>
        <Item>
            <a class="w-full h-full" href="/doc/submit-api-package">
                Submit API package
            </a>
        </Item>
    </Content>
</Root>